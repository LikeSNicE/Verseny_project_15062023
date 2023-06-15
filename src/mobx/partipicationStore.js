import { makeAutoObservable } from "mobx";
import ConcursService from "../services/concursService";

export default class PartipicationStore{
    constructor() {
        makeAutoObservable(this);
    }
    isLoadingButton = false;
    async getConcursShareFiles(id){
        try {
            const responce = await ConcursService.GetFilesPartipication(id);
            return {
                ...responce.data,
                success:true
            }
        } catch (error) {
            return {
                success:false
            }
        }
    }
    async getConcursShareUserFiles(path){
        try {
            const responce = await ConcursService.GetConcursShareUserFiles(path);
            return {
                ...responce.data,
                success:true
            }
        } catch (error) {
            console.log(error)
            return {
                success:false
            }
        }
    }
    async getWinnersConcurs(id){
        try {
            const responce = await ConcursService.GetWinnersContest(id)
            return {
                ...responce.data.data,
                success:true
            }
        }catch(error){
            console.log(error)
            return {
                success:false
            }
        }
    }
    async setWinnersConcurs(id,data){
        this.isLoadingButton = true;
        try {
            const responce = await ConcursService.SetWinnersContest(id,data);
            return responce.data;
        }catch(error){
            console.log(error);
            return error;
        }
        finally{
            this.isLoadingButton = false;
        }
    }
}