import clientPromise from "../lib/mongodb";

export default function Home({ users }) {
  return (
    <div className="container">
      <div>
        {users.map((user, index) => {
          return (
            <div className="card" key={index}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.mobile}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db("nextjs-mongodb-atlas-demo");

  let users = await db.collection("users").find({}).toArray();
  users = JSON.parse(JSON.stringify(users));

  return {
    props: { users },
  };
}
