export const LocationAuth = () => {
    const { $api } = useNuxtApp()


    const getUserlPBylp2Location = async () => {
        try {

            const response = await $api(`/common/ip/getUserIPByIp2Location`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const findCountryList = async () => {
        try {

            const response = await $api(`/common/country/listAll`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const listCountryAll = async () => {
        try {

            const response = await $api(`/common/ip2Location/listCountryAll`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const listProvinceByCountryId = async (params) => {
        try {
            const query = new URLSearchParams(params).toString()
            const response = await $api(`/common/ip2Location/listProvinceByCountryId?${query}`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const listCityByRegionId = async (params) => {
        try {
            const query = new URLSearchParams(params).toString()

            const response = await $api(`/common/ip2Location/listCityByRegionId?${query}`, {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    return { getUserlPBylp2Location, findCountryList, listCountryAll, listProvinceByCountryId, listCityByRegionId }
}
