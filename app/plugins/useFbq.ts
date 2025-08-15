// /composables/useFbq.ts
type Currency = 'USD' | 'EUR' | 'GBP' | 'HKD' | 'CNY' | string

type FbqContent = {
    id: string | number
    quantity?: number
    item_price?: number
}

type BaseParams = {
    value?: number
    currency?: Currency
    content_ids?: Array<string | number>
    content_type?: 'product' | 'product_group' | string
    contents?: FbqContent[]
    num_items?: number
    // 其他可选字段：content_category, content_name, coupon, predicted_ltv 等
    [k: string]: any
}

function safeFbq(...args: any[]) {
    if (typeof window === 'undefined') return
    const fbq = (window as any).fbq
    if (typeof fbq === 'function') fbq.apply(null, args)
    // 若需要：可在这里做队列缓存，脚本未加载完成时暂存，加载后重放
}

function normContents(items?: FbqContent[] | undefined) {
    if (!items?.length) return undefined
    return items.map(i => ({
        id: i.id,
        quantity: i.quantity ?? 1,
        item_price: typeof i.item_price === 'number' ? i.item_price : undefined
    }))
}

export function useFbq(defaults?: Partial<BaseParams>) {
    const defCurrency: Currency = defaults?.currency ?? 'USD'

    /** 加入购物车 -> AddToCart */
    function addToCart(params: BaseParams) {
        const payload: BaseParams = {
            currency: params.currency ?? defCurrency,
            value: params.value, // 单个或合计金额
            content_ids: params.content_ids,
            content_type: params.content_type ?? 'product',
            contents: normContents(params.contents),
            num_items: params.num_items ?? params.contents?.reduce((n, c) => n + (c.quantity ?? 1), 0),
            ...params,
        }
        safeFbq('track', 'AddToCart', payload)
    }

    /** 点击结算 -> InitiateCheckout */
    function initiateCheckout(params: BaseParams) {
        const payload: BaseParams = {
            currency: params.currency ?? defCurrency,
            value: params.value,
            content_ids: params.content_ids,
            content_type: params.content_type ?? 'product',
            contents: normContents(params.contents),
            num_items: params.num_items ?? params.contents?.reduce((n, c) => n + (c.quantity ?? 1), 0),
            ...params,
        }
        safeFbq('track', 'InitiateCheckout', payload)
    }

    /** 提交订单(到支付信息步骤) -> AddPaymentInfo */
    function addPaymentInfo(params: BaseParams) {
        const payload: BaseParams = {
            currency: params.currency ?? defCurrency,
            value: params.value,
            content_ids: params.content_ids,
            content_type: params.content_type ?? 'product',
            contents: normContents(params.contents),
            num_items: params.num_items ?? params.contents?.reduce((n, c) => n + (c.quantity ?? 1), 0),
            ...params,
        }
        safeFbq('track', 'AddPaymentInfo', payload)
    }

    /** 付款成功 -> Purchase（务必在支付成功页或回调里触发） */
    function purchase(params: BaseParams & { value: number; currency?: Currency }) {
        const payload: BaseParams = {
            currency: params.currency ?? defCurrency,
            value: params.value, // 订单总金额（不含运费/含券看你上报口径）
            content_ids: params.content_ids,
            content_type: params.content_type ?? 'product',
            contents: normContents(params.contents),
            num_items: params.num_items ?? params.contents?.reduce((n, c) => n + (c.quantity ?? 1), 0),
            // 可加：order_id、tax、shipping、coupon 等自定义字段
            ...params,
        }
        safeFbq('track', 'Purchase', payload)
    }

    return {
        addToCart,
        initiateCheckout,
        addPaymentInfo,
        purchase,
    }
}
