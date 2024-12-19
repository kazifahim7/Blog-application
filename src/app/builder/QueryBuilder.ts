import { Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery:Query<T[],T>
    public query:Record<string,unknown>
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery=modelQuery
        this.query=query
        
    }

    search(searchField:string[]){
        if (this.query.search){
            this.modelQuery=this.modelQuery.find({
                $or : searchField.map((field)=>({
                    [field]: { $regex: this.query.search , $options:"i"}
                }))
            })
        }
        return this
    }

    filter(){
        // eslint-disable-next-line prefer-const
        let queryObj:Record<string,unknown> ={}

        if(this.query.filter){
            queryObj.author=this.query.filter
        } else if (this.query.author){
            queryObj.author = this.query.author
        }

       
        this.modelQuery = this.modelQuery.find(queryObj)

        return this


    }

    sortBy(){
        let sortBy ="createdAt"
        if (this.query?.sortBy){
            sortBy = this.query?.sortBy as string
        }
        this.modelQuery=this.modelQuery.sort(sortBy)
        return this
    }

    sortOrder(){
        let sortOrder = "asc"
        if (this.query.sortOrder){
            sortOrder = this.query.sortOrder as string
        }
        let sortBy = "createdAt"
        if (this.query?.sortBy) {
            sortBy = this.query?.sortBy as string
        }
        this.modelQuery = this.modelQuery.sort({[sortBy]:sortOrder==='asc'?1 :-1})
        return this
    }

    


}


export default QueryBuilder