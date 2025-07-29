export const CommentAuth = () => {
    const { $api } = useNuxtApp()


    const getspuCommentProductRollPage = async (params) => {
        try {
            const response = await $api('/product/productComment/spuCommentProductRollPage', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const getgroupComment = async (params) => {
        try {
            const response = await $api('/product/productComment/groupComment', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }

    return { getspuCommentProductRollPage, getgroupComment }
}
