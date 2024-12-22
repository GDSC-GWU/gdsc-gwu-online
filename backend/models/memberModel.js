class Member{
    constructor(name, year, title, email, github, linkedin, photoURL, id = null){
        (this.name = name),
        (this.year = year),
        (this.title = title),
        (this.email = email),
        (this.github = github),
        (this.linkedin = linkedin),
        (this.photoURL = photoURL),
        (this.id = id)
    }
}

export default Member;