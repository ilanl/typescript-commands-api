import * as mongoose from 'mongoose';
import RepositoryBase from "../../base/baseRepository"

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IHeroModel extends mongoose.Document {
  name: string;
  power: string;
  amountPeopleSaved: number;
  createdAt: Date;
}

let schema = new Schema({
  name: {
	   type: String,
	   required: true
  },
  power: {
	   type: String,
	   required: false
  },
  amountPeopleSaved: {
	   type: Number,
	   required: false
  },
  createdAt: {
	   type: Date,
     required: false,
     default: Date.now
  }
})

export let HeroSchema = mongoose.model<IHeroModel>('Hero', schema);

export class HeroModel {

  private _heroModel: IHeroModel;

  constructor(heroModel: IHeroModel) {
    this._heroModel = heroModel;
  }
  get name(): string {
    return this._heroModel.name;
  }

  get power(): string {
    return this._heroModel.power;
  }

  get amountPeopleSaved(): number {
    return this._heroModel.amountPeopleSaved;
  }
}

Object.seal(HeroModel);

export class HeroRepository extends RepositoryBase<IHeroModel> {
  constructor() {
    super(HeroSchema);
  }
}

Object.seal(HeroRepository);