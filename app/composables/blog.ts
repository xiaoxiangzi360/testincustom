export const BlogAuth = () => {
  const { $api } = useNuxtApp()
  const topicPrefix = '/product/blogTopic'
  const blogPrefix = '/product/blogPost'

  const getBlogTopicById = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`${topicPrefix}/getBlogTopicById?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const blogTopicRollPage = async (data: any) => {
    try {
      const response = await $api(`${topicPrefix}/blogTopicRollPage`, {
        method: 'POST',
        body: data,
      })

      return response
    } catch (error) {

      throw error
    }
  }


  const blogPostRollPage = async (data: any) => {
    try {
      const response = await $api(`${blogPrefix}/blogPostRollPage`, {
        method: 'POST',
        body: data,
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const listAllBlogTag = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/blogTag/listAllBlogTag?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

   const listPublishBlogPostTagByBlogTopicId = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`/product/blogTag/listPublishBlogPostTagByBlogTopicId?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

   const getBlogPostById = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`${blogPrefix}/getBlogPostById?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }


  const getLastBlogPostById = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`${blogPrefix}/getLastBlogPostById?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }

  const getNextBlogPostById = async (params) => {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await $api(`${blogPrefix}/getNextBlogPostById?${query}`, {
        method: 'GET',
      })

      return response
    } catch (error) {

      throw error
    }
  }
  return {
    getBlogTopicById,
    blogTopicRollPage,
    blogPostRollPage,
    listAllBlogTag,
    getBlogPostById,
    getLastBlogPostById,
    getNextBlogPostById,
    listPublishBlogPostTagByBlogTopicId
  }
}
