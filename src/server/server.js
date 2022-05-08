import { createServer } from "miragejs"

export default createServer({
      routes() {
          this.post("/api/form", (schema, request) =>{
              let req = JSON.parse(request.requestBody)
              return { req }
          })
      }
  })
