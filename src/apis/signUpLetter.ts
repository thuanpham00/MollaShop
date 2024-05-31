import axios from "axios"

const signUpLetter = {
  signUp: (email: string) => {
    return axios({
      method: "post",
      url: "https://docs.google.com/forms/d/e/1FAIpQLScr7qb4fdEuI39_R0rZoFP8AhUizZ__WLXMHMzyXElkct3mSg/formResponse",
      data: {
        email: email
      }
    })
  }
}

export default signUpLetter
