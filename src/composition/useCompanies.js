import { ref } from 'vue';

const companies = ref({})

const addedCompanies = ref([])

/* const arrAddCompanys = ref([
    {name: "ПАО СБЕРБАНК"},
    {name: "БАЙКАЛЬСКИЙ БАНК ПАО СБЕРБАНК"},
    {name: "ДАЛЬНЕВОСТОЧНЫЙ БАНК ПАО СБЕРБАНК"},
    {name: "ЗАПАДНО-СИБИРСКОЕ ОТДЕЛЕНИЕ №8647"},
    {name: "МОСКОВСКИЙ БАНК ПАО СБЕРБАНК"},
    {name: "ПОВОЛЖСКИЙ БАНК ПАО СБЕРБАНК"},
    {name: "СИБИРСКИЙ БАНК ПАО СБЕРБАНК"},
    {name: "УРАЛЬСКИЙ БАНК ПАО СБЕРБАНК"},
    {name: "СРЕДНЕРУССКИЙ БАНК ПАО СБЕРБАНК"},
    {name: "АБАКАНСКОЕ ОТДЕЛЕНИЕ №8602 ПАО СБЕРБАНК"},
]) */

const arrAddCompanys = ref([
])

export function useCompanies() {
    const getCompanies = async () => {
       let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
       let token = "0931955768c79992c6cd73b6ea2157405a2f3e8d";
       let query = "7707083893";
       
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
       /* .then(res => res.json()) */
    }
    return {
        companies,
        addedCompanies,
        arrAddCompanys,
        
        getCompanies,
        postDataCompanie,
    }
 
}
