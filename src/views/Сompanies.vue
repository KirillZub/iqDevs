<template>
    <div class="companies">
        <div class="companies__wrapper">
            <input type="text" v-model="dataInn" @input="searchCompanies(dataInn)" placeholder="Укажите ИНН" class="companies__list">
            <template v-for="(companie, index) in newCompaniesArray" :key="index">
                <div class="companies__list pointer" @click="searchSelectCompany(companie.value, companie.data.inn, companie.data.ogrn, companie.data.kpp)">{{companie.value + ' ' + companie.data.inn}}</div>
            </template>
            <div class="companies__company" v-if="selectCompany.name == '' && selectCompany.inn == ''">
                <div class="companies__company_title-none">Выберите компанию</div>
            </div>
            <div class="companies__company" v-else>
                <div class="companies__company_title">{{selectCompany.name + ' ' + selectCompany.inn}}</div>
                <div class="companies__company_button pointer" @click="addNewCompany(selectCompany.name, selectCompany.inn, selectCompany.ogrn, selectCompany.kpp )">Добавить компанию</div>
            </div>
            <div class="companies__table-none" v-if="!addedCompanies[0]">
                В таблице нет компаний
            </div>
            <table class="companies__table" v-else>
                 <tr class="companies__table_row">
                    <td class="companies__table_title" v-for="(titleTable, index) in titleTables" :key="index">{{titleTable.name}}</td>
                    <td></td>
                 </tr>
                 <tr class="companies__table_row" v-for="(addedCompanie, index) in addedCompanies" :key="index">
                    <td class="companies__table_title">{{addedCompanie.name}}</td>
                    <td class="companies__table_title">{{addedCompanie.inn}}</td>
                    <td class="companies__table_title">{{addedCompanie.owner}}</td>
                    <td class="companies__table_delete">
                        <svg class="companies__table_button-del pointer" @click="deleteCompanie(index)" width="21" height="16" viewBox="0 0 51 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="45.7225" y1="1.81957" x2="1.71439" y2="43.2838" stroke="#FF0000" stroke-width="5"/>
                            <line y1="-2.5" x2="60.4649" y2="-2.5" transform="matrix(0.72783 0.685758 0.685758 -0.72783 6 0)" stroke="#FF0000" stroke-width="5"/>
                        </svg>
                    </td>
                 </tr>
            </table>
            <div class="companies__footer">
                <div class="companies__footer_counter">Всего {{Object.keys(addedCompanies).length}} компаний</div>
                <div class="companies__footer_button-save pointer" @click="saveData()">Сохранить</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useCompanies } from "@/composition/useCompanies";

export default {
    setup() {
        const {getCompanies, companies, arrAddCompanys, postDataCompanie, addedCompanies} = useCompanies()

        const newCompaniesArray = ref()

        getCompanies()
        .then(r=>{
            companies.value = {...r.suggestions}
            newCompaniesArray.value = {...r.suggestions}
        })

        const selectCompany = ref({
            name: "",
            inn: "",
            owner: "",
            ogrn: "",
            kpp: "",
        })

        const searchSelectCompany = (nameCompany, innCompany, ogrnCompany, kppCompany) => {
            selectCompany.value.name = nameCompany
            selectCompany.value.inn = innCompany
            selectCompany.value.ogrn = ogrnCompany
            selectCompany.value.kpp = kppCompany
        }

        const titleTables = ref([
            {name: "Название"},
            {name: "Инн"},
            {name: "Владелец"},
        ])

        const dataInn = ref("")

        const searchCompanies = (inn) => {

            if(inn){
                
                newCompaniesArray.value = Object.values(companies.value).filter(item => /* item.inn.startsWith(inn) */ /* console.log(companies.value.item) */ /* console.log(item) */)
            }
            else{
                newCompaniesArray.value = companies.value
            }
        }

        const owner = ref()

        const addNewCompany = (nameCompany, innCompany, ogrnCompany, kppCompany) => {
            for(let i=0; i < Object.keys(companies.value).length; i++){
                if(companies.value[i].data.management == null){
                    for(let j=0; j < Object.keys(companies.value).length; j++){
                        if(companies.value[j].data.management != null){
                            if(companies.value[i].data.inn == companies.value[j].data.inn){
                                owner.value = companies.value[j].data.management.name
                            }
                        }
                    }
                }
            }
            arrAddCompanys.value.push({
                name: nameCompany,
                inn: innCompany,
                ogrn: ogrnCompany,
                kpp: kppCompany,
            })
            addedCompanies.value.push({
                name: nameCompany,
                inn: innCompany,
                owner: owner.value,
            })

            selectCompany.value.name = ""
            selectCompany.value.inn = ""
        }

        const deleteCompanie = (index) => {
            addedCompanies.value.splice(index, 1)
            arrAddCompanys.value.splice(index, 1)
        }

        const saveData = () => {
            postDataCompanie()
        }

        return{
            titleTables,

            dataInn,

            owner,

            selectCompany,
            searchSelectCompany,

            addNewCompany,
            addedCompanies,
            deleteCompanie,

            newCompaniesArray,
            searchCompanies,

            saveData,

            companies,
            arrAddCompanys,
        }
    }
}
</script>

<style lang="scss" src="./Companies.scss"></style>