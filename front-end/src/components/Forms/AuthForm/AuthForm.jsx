import './authForm.css'


export const AuthForm = (props) => {
    return (
        <main className='main-form'>
            <div className="container">
                <div className='text-header'>
                    <h2>{props.title}</h2>
                </div>
                {props.children}
            </div>
        </main>
    )
}
