import Show from "../../models/Show.js"

class ShowSeeder {
  static async seed() {
    const showsData = [
      {
        title: "The Good Wife",
        network: "CBS",
        premiereYear: 2009,
        description: "It focuses on Alicia Florrick, the wife of the Cook County State's Attorney who returns to her career in law after the events of a public sex and political corruption scandal involving her husband."
      },
      {
        title: "Law and Order",
        network: "NBC",
        premiereYear: 1990,
        description: "A crime procedural that features both a police investigation of a crime discovered during the cold open, and a prosecution case set forth by the New York County District Attorney, at the Manhattan DA's office."
      },
      {
        title: "Bones",
        network: "Fox",
        premiereYear: 2005
      }
    ]
    for (const singleShowData of showsData) {
      const currentShow = await Show.query().findOne({ title: singleShowData.title })
      if (!currentShow) {
        await Show.query().insert(singleShowData)
      }
    }
  }
}

export default ShowSeeder