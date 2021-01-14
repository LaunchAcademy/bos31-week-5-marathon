import { connection } from "../boot.js"
import ShowSeeder from "./seeders/ShowSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding shows")
    await ShowSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder