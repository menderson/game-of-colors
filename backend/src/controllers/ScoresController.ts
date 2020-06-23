import { Request, Response } from 'express';
import knex from '../database/connection';

class ScoresController {
    async index(request: Request, response: Response) {
        const moment = require("moment");
        const momentMonth = moment().format("MM");
        const momentYear = moment().format("YYYY");
        let day =moment().format("DD");
        const hour = moment().format("hh");
        const Z = moment().format('A');
        if(Z==="PM" && hour >=9) {
            day = day -1;
        }
        const scores = await
            knex('scores')
                .select('*')
                .where('day',day)
                .where('month', momentMonth)
                .where('year', momentYear)
                .orderBy('score', 'desc')
                .limit(10);

        return response.json(scores);
    }

    
    async create(request: Request, response: Response) {
        const {
            name,
            score,
        } = request.body;

        const moment = require("moment");
        let day =moment().format("DD");
        const month = moment().format("MM");
        const year = moment().format("YYYY");
        const hour = moment().format("hh");
        const minute = moment().format("mm");
        const Z = moment().format('A');
        if(Z==="PM" && hour >=9) {
            day = day -1;
        }

        const newScore = {
            name,
            score,
            day,
            month,
            year,
            hour,
            minute,
        };
        const insertedIds = await knex('scores').insert(newScore);   //inserir no banco de dados

        const score_id = insertedIds[0];

        return response.json({
            id: score_id,
            ...newScore,
        });
    }
}

export default ScoresController;