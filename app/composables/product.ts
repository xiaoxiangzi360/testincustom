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
  const listGuidingStarPublishTree = async () => {
    try {
      const response = await $api(`/product/guidingStar/listGuidingStarPublishTree`, {
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

  const getProductSpuLevelTwo = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/product/groupProductSpuLevelTwoCatalogByCatalogId?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }
  const checkProductAvailablePurchase = async (params) => {
    try {
      const response = await $api('/product/product/checkProductAvailablePurchase', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const getSpuCatalogTwoLevelByTagId = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/product/groupProductSpuLevelTwoCatalogByTagId?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const getSpuCatalogPropByCatalogId = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/product/groupProductSpuCatalogPropByCatalogId?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const getProductTagById = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/product/getProductTagById?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

  //批量查询商品信息

  const listProductSpuV2ByIdList = async (params) => {
    try {
      const response = await $api('/product/product/listProductSpuV2ByIdList', {
        method: 'POST',
        body: params,
      })

      return response
    } catch (error) {

      throw error
    }
  }
  return { listProductSpuV2ByIdList, getProductTagById, getProductSpuLevelTwo, getSpuCatalogTwoLevelByTagId, getSpuCatalogPropByCatalogId, checkProductAvailablePurchase, listGuidingStarPublishTree, getProductSpuV2ById, getProductDetailsById, randomRecommendationProductByCatalogId, getUserProductRollPage, getmapProductSpuV2ByProductSkuV2IdList, customizedProductPriceTrialCalculation, erpTryToCreateSkuV2, getproductSearch, productSearchRecommendation, listOnlineMallProductCatalogTree, trialPriceCalculationBySpuV4, getMallProductCatalogById, getconfigRollPage, propSideLengthTool }
}

