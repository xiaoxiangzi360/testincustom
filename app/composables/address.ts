export const AddressAuth = () => {
    const { $api } = useNuxtApp()


    const findProvincesByCountryCode = async (params) => {
        try {
            const query = new URLSearchParams(params).toString()

            const response = await $api(`/common/geoName/findProvincesByCountryCode?${query}`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const findCountryList = async () => {
        try {

            const response = await $api(`/common/geoName/countryLists`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const findCityByAdmin1Code = async (params) => {
        try {
            const query = new URLSearchParams(params).toString()

            const response = await $api(`/common/geoName/findCityByAdmin1Code?${query}`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const getuserAddressRollPage = async (params) => {
        try {
            const response = await $api('/user/userAddress/userAddressRollPage', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const createUserAddress = async (params) => {
        try {
            const response = await $api('/user/userAddress/createUserAddress', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const editUserAddress = async (params) => {
        try {
            const response = await $api('/user/userAddress/editUserAddress', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const deleteUserAddressByIdList = async (params) => {
        try {
            const response = await $api('/user/userAddress/deleteUserAddressByIdList', {
                method: 'POST',
                body: params,
            })

            return response
        } catch (error) {

            throw error
        }
    }
    return { findProvincesByCountryCode, findCountryList, findCityByAdmin1Code, getuserAddressRollPage, createUserAddress, editUserAddress, deleteUserAddressByIdList }
}
