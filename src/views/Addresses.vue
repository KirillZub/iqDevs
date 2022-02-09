<template>
    <div class="addresses">
        <div class="addresses__wrapper">
            <table class="addresses__table">
                 <tr class="addresses__table_row">
                    <td class="addresses__table_title" v-for="(titleTable, index) in titleTables" :key="index">{{titleTable.name}}</td>
                 </tr>
                 <tr class="addresses__table_row" v-for="(newCityCompanie, index) in cities" :key="index">
                    <td class="addresses__table_title">{{newCityCompanie.name}}</td>
                    <td class="addresses__table_title">{{newCityCompanie.counter}}</td>
                    <td class="addresses__table_title">{{newCityCompanie.counter*100/cityCompanies.length}} %</td>
                 </tr>
            </table>
            <div class="addresses__footer">
                <div class="addresses__footer_counter">Всего {{cityCompanies.length}} компаний в {{cities.length}} городах</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useCompanies } from "@/composition/useCompanies";

export default {
    setup() {
        const {getCompanies, companies, arrAddCompanys, tempStorage} = useCompanies()

        getCompanies()
        .then(r=>{
            companies.value = {...r.suggestions}
        })
        
        const titleTables = ref([
            {name: "Город"},
            {name: "Компаний"},
            {name: "% от всех компаний"},
        ])

        const cityCompanies = ref([])
        const newCityCompanies = ref()
        const citiCount = ref([])

        const cities = ref([])

        const сalculationСities = () => {
            cityCompanies.value = tempStorage.value;
            let tempCityes = {}
            for(let i = 0; i < cityCompanies.value.length; i++){
                let cityName = cityCompanies.value[i].data.address.value.match(/^([а-я]{0,1})(\s)*([а-я]+)/i)[3]
                if(!tempCityes[cityName]){
                    tempCityes[cityName] = {name: cityName, counter: 1}
                } else {
                    tempCityes[cityName].counter++
                }
            }

            cities.value = Object.keys(tempCityes).map(key => tempCityes[key])
        }

        const сalculationCounter = () => {
        }

        watch(() => {
            сalculationСities()
            сalculationCounter()
        })

        return{
            titleTables,
            
            cityCompanies,
            citiCount,

            companies,
            arrAddCompanys,

            сalculationСities,
            сalculationCounter,

            newCityCompanies,

            cities,

            tempStorage,
        }
    }
}
</script>

<style lang="scss" src="./Addresses.scss"></style>