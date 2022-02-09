import { ref } from 'vue';

const companies = ref({})

const addedCompanies = ref([])

const arrAddCompanys = ref([
])

const tempStorage = ref([])

export function useCompanies() {
    const getCompanies = async (query) => {
       let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
       let token = "0931955768c79992c6cd73b6ea2157405a2f3e8d";
       
       let options = {
           method: "POST",
           mode: "cors",
           headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
               "Authorization": "Token " + token
           },
           body: JSON.stringify({query: query})
       }
       
   
       return await fetch(url, options)
           .then(res =>  res.json())
    }

    const postDataCompanie = async () => {
        let data = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({companies: arrAddCompanys.value})
        }
       return await fetch("http://localhost:8080/", data)
    }
    return {
        companies,
        addedCompanies,
        arrAddCompanys,
        tempStorage,
        
        getCompanies,
        postDataCompanie,
    }
 
}
