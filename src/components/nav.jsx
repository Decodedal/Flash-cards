import "../styles/nav.css"

export default function Nav(){
    return(
        <div className="nav-container">
            <a href="/">Home</a>
            <div className="right">
                <a href='/new'>Add</a>
                <a href='delete'>Edit / Delete</a>
            </div>
        </div>
    )
}