export const ProductAuth = () => {
  const { $api } = useNuxtApp()


  const getProductSpuV2ById = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/product/getProductSpuV2ById?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }
  const getProductDetailsById = async (params) => {
    try {
      const response = await $api('/product/product/getProductDetailsById', {
        method: 'POST',
        body: params,
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
  const getmapProductSpuV2ByProductSkuV2IdList = async (params) => {
    try {
      const response = await $api('/product/product//mapProductSpuV2ByProductSkuV2IdList', {
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
  const trialPriceCalculationBySpuV4 = async (params) => {
    try {
      const response = await $api('/product/product/trialPriceCalculationBySpuV4', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }
  const erpTryToCreateSkuV2 = async (params) => {
    try {
      const response = await $api('/product/product/erpTryToCreateSkuV2', {
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

  const listOnlineMallProductCatalogTree = async () => {
    try {
      const response = await $api(`/product/mallProductCatalog/listOnlineMallProductCatalogTree`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const getMallProductCatalogById = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/mallProductCatalog/getMallProductCatalogById?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const getconfigRollPage = async (params) => {
    try {
      const response = await $api('/user/homePageConfig/configRollPage', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const propSideLengthTool = async (params) => {
    try {
      const response = await $api('/product/product/propSideLengthTool', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }
  return { getProductSpuV2ById, getProductDetailsById, randomRecommendationProductByCatalogId, getUserProductRollPage, getmapProductSpuV2ByProductSkuV2IdList, customizedProductPriceTrialCalculation, erpTryToCreateSkuV2, getproductSearch, productSearchRecommendation, listOnlineMallProductCatalogTree, trialPriceCalculationBySpuV4, getMallProductCatalogById, getconfigRollPage, propSideLengthTool }
}
