
const Dashboard = (props) => {
    console.log(props);
    return (
        <div>
            <center>
            <h1>Welcome</h1>
            <h5> {props.uName}</h5>
            </center>
        </div>
    )
}

export default Dashboard;
