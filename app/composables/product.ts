export const ProductAuth = () => {
  const { $api } = useNuxtApp()


  const getProductById = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/product/getProductById?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const randomRecommendationProductByCatalogId = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/product/randomRecommendationProductByCatalogId?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const getUserProductRollPage = async (params) => {
    try {
      const response = await $api('/product/product/userProductRollPage', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const getproductSearch = async (params) => {
    try {
      const response = await $api('/product/product/productSearch', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }
  const getmapProductByProductSkuList = async (params) => {
    try {
      const response = await $api('/product/product//mapProductByProductSkuList', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }
  const customizedProductPriceTrialCalculation = async (params) => {
    try {
      const response = await $api('/product/product/customizedProductPriceTrialCalculation', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }
  const trialPriceCalculationBySpuV2 = async (params) => {
    try {
      const response = await $api('/product/spuMeter/trialPriceCalculationBySpuV2', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }
  const erpTryToCreateSku = async (params) => {
    try {
      const response = await $api('/product/product/erpTryToCreateSku', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }
  const productSearchRecommendation = async (params) => {
    try {
      const response = await $api('/product/product/productSearchRecommendation', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }
  return { getProductById, randomRecommendationProductByCatalogId, getUserProductRollPage, getmapProductByProductSkuList, customizedProductPriceTrialCalculation, erpTryToCreateSku, trialPriceCalculationBySpuV2, getproductSearch, productSearchRecommendation }
}
