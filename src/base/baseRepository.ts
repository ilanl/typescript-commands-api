import * as mongoose from "mongoose"

export class RepositoryBase<T extends mongoose.Document> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }
    
    create(item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this._model.create([item]).then((item: [T]) => {
                resolve(item[0]);
            }).catch((err)=> { 
                reject(err); 
            })
        })
    }

    retrieve(): Promise<[T]> {
        return new Promise((resolve, reject) => {
            this._model.find({}).then((items: [T]) => resolve(items)).catch((err)=> reject(err));
        })
    }

    update(_id: mongoose.Types.ObjectId, item: T): Promise<T>  {
        return new Promise((resolve, reject) => {
            this._model.update({ _id: _id }, item).then((item: T|null) => resolve(item)).catch((err)=> reject(err));
        })
    }

    delete(_id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this._model.remove({ _id: this.toObjectId(_id) }).then(()=> resolve()).catch((err)=> reject(err));
        })
    }

    findById(_id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this._model.findById(_id).then((item: T|null) => resolve(item)).catch((err) => reject(err));
        })
    }

    findOne(cond?: Object): Promise<T> {
        return new Promise((resolve, reject) => {
            this._model.findOne(cond).then((item: T | null) => resolve(item)).catch((err)=> reject(err));
        })
    }
    
    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}
  
export default RepositoryBase