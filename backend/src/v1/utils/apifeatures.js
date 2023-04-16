class Apifeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword ? {
        name: {
            $regex: this.queryStr.keyword,
            $options: "i"
        }
    }:{};
    console.log("chay qua day");
    this.query = this.query.find({...keyword});
    return this;
  }
  filter() {
    const queryCoppy = {...this.queryStr};
    //Removing some fields for category
    const removeFields = ["keyword","page","limit"];
    removeFields.forEach((key) => delete queryCoppy[key]);
    //Filter for price and rating
    let queryStr = JSON.stringify(queryCoppy);
    console.log(queryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    console.log({currentPage: currentPage});
    const skip = resultPerPage * (currentPage - 1);
    console.log({skip: skip});
    this.query = this.query.limit(resultPerPage).skip(skip);
    // console.log(this.query);
    return this;
  }
}

module.exports = Apifeatures;


