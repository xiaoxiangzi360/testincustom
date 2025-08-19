// composables/useTrack.ts

export type TrackItem = {
    item_id: string | number
    item_name: string
    price?: number
    currency?: string
    quantity?: number
    affiliation?: string
    coupon?: string
    discount?: number
    index?: number
    item_brand?: string
    item_category?: string
    item_category2?: string
    item_category3?: string
    item_category4?: string
    item_category5?: string
    item_list_id?: string
    item_list_name?: string
    item_variant?: string
    location_id?: string
}

export type BeginCheckoutPayload = {
    // 任选：传 items（推荐）或只传 value+currency
    items?: TrackItem[]
    value?: number
    currency?: string
    coupon?: string
}

export type PurchasePayload = {
    transaction_id: string                 // 订单ID（必填）
    items: TrackItem[]                     // 购买的明细（必填）
    value: number                          // 订单总金额（含税运或不含，与你后台保持一致）
    currency: string                       // 币种
    tax?: number                           // 税额（可选）
    shipping?: number                      // 运费（可选）
    coupon?: string                        // 使用的优惠券（可选）
    affiliation?: string                   // 店铺/渠道名（可选）
}

declare global {
    interface Window {
        gtag?: (...args: any[]) => void
        fbq?: (...args: any[]) => void
        dataLayer?: any[]
    }
}

const DEBUG_TRACK = process.dev

function sendGA4(eventName: string, payload: Record<string, any>) {
    if (typeof window === 'undefined') return

    if (typeof window.gtag === 'function') {
        DEBUG_TRACK && console.log('[GA4 gtag]', eventName, payload)
        window.gtag('event', eventName, payload)
        return
    }

    // Fallback: GTM dataLayer
    window.dataLayer = window.dataLayer || []
    const isEcom = [
        'view_item',
        'view_item_list',
        'select_item',
        'add_to_cart',
        'remove_from_cart',
        'begin_checkout',
        'add_shipping_info',
        'add_payment_info',
        'purchase'
    ].includes(eventName)
    if (isEcom) window.dataLayer.push({ event: eventName, ecommerce: null })

    const dlObj: any = { event: eventName, ...payload }
    DEBUG_TRACK && console.log('[GA4 dataLayer]', dlObj)
    window.dataLayer.push(dlObj)
}

function calcValueFromItems(items?: TrackItem[]) {
    if (!items?.length) return 0
    return Number(
        items.reduce((sum, it) => sum + Number(it.price ?? 0) * Number(it.quantity ?? 1), 0).toFixed(2)
    )
}

export function useTrack() {
    /** 查看单个商品详情 */
    const viewItem = (item: TrackItem) => {
        const price = Number(item.price ?? 0)
        const quantity = item.quantity ?? 1
        const currency = item.currency || 'USD'
        sendGA4('view_item', {
            currency,
            value: Number((price * quantity).toFixed(2)),
            items: [item],
        })
    }

    /** 查看商品列表 */
    const viewItemList = (items: TrackItem[], listId: string, listName: string) => {
        sendGA4('view_item_list', { item_list_id: listId, item_list_name: listName, items })
    }

    /** 从列表选择商品 */
    const selectItem = (items: TrackItem[], listId: string, listName: string) => {
        sendGA4('select_item', { item_list_id: listId, item_list_name: listName, items })
    }

    /** 加入购物车（单件/当前项） */
    const addToCart = (item: TrackItem) => {
        const price = Number(item.price ?? 0)
        const quantity = item.quantity ?? 1
        const currency = item.currency || 'USD'
        sendGA4('add_to_cart', {
            currency,
            value: Number((price * quantity).toFixed(2)),
            items: [item],
        })
    }

    /** 启动结账（begin_checkout） */
    const beginCheckout = (payload: BeginCheckoutPayload) => {
        const currency = payload.currency || payload.items?.[0]?.currency || 'USD'
        const value =
            typeof payload.value === 'number' ? payload.value : calcValueFromItems(payload.items)
        const gaPayload: any = {
            currency,
            value,
        }
        if (payload.coupon) gaPayload.coupon = payload.coupon
        if (payload.items?.length) gaPayload.items = payload.items
        sendGA4('begin_checkout', gaPayload)
    }

    /** 购买（purchase） */
    const purchaseorder = (payload: PurchasePayload) => {
        const {
            transaction_id,
            items,
            value,
            currency,
            tax,
            shipping,
            coupon,
            affiliation,
        } = payload

        const gaPayload: any = {
            transaction_id,
            value,
            currency,
            items,
        }
        if (typeof tax === 'number') gaPayload.tax = tax
        if (typeof shipping === 'number') gaPayload.shipping = shipping
        if (coupon) gaPayload.coupon = coupon
        if (affiliation) gaPayload.affiliation = affiliation

        sendGA4('purchase', gaPayload)
    }

    return {
        viewItem,
        viewItemList,
        selectItem,
        addToCart,
        beginCheckout,
        purchaseorder,
    }
}
