export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    //this maps through the user data to grab the id property and assign it to the route
    //this ensures next will prefetch the data it needs for dynamic routing
    //paths: [{}, {}, { params: { id: }}]
    const paths = data.map(ninja => {
        return {
            params: { id: ninja.id.toString() }
        }
    })

    return {
        paths, 
        //fallback property ensures that if a user tries to access a route that doesn't exist they will be shown the 404 page
        fallback: false
    }   
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
    const data = await res.json();

    return {
        props: {ninja: data}
    }

}


const Details = ({ninja}) => {
    return ( 
        <div>
            <h1>
                {ninja.name}
            </h1>
            <p>{ninja.name}</p>
            <p>{ninja.email}</p>
            <p>{ninja.website}</p>
            <p>{ninja.address.city}</p>
        </div>
     );
}
 
export default Details;