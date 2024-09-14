import { useEffect, useState, useCallback, memo } from 'react'


function App () {
    const [cards, setCards] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:3000/cards');
            const data = await res.json();
            setCards(data.cards);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);
          
    return <div>
        <Form onAddCard={ fetchData}></Form>
        <Card cards={ cards }></Card> 
    </div>
}

const Form = memo(({onAddCard }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [interest, setInterest] = useState([])
    const [social, setSocial] = useState([])

    return <div>
       <input type="text" placeholder="name" onChange={(e) => {
            setName(e.target.value);
        }}></input> <br />
        <input type="text" placeholder="description" onChange={(e) => {
            setDescription(e.target.value);
        }}></input> <br />
        <input type="text" placeholder="interest" onChange={(e) => {
            setInterest(e.target.value.split(' '));
        }}></input> <br />
        <input type="text" placeholder="social" onChange={(e) => {
            setSocial(e.target.value.split(' '));
        }}></input> <br />
        <button onClick={
            async () => {
                const response = await fetch('http://localhost:3000/cards', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        description: description,
                        interests: interest,
                        socials: social
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                //const data = await response.json();
             //   alert('Card added');
                onAddCard();
            }
        }>Add a Business Card</button>
    </div>
})

const Card = ({ cards}) => {
    return <div>
        {cards.map((card) => {
            return <div key={card._id}  style={styles.card}>
              <h2 style={styles.name}>{card.name}</h2>
                <p style={styles.description}>{card.description}</p>
                <h3 style={styles.interestsHeader}>Interests</h3>
        <ul style={styles.interestsList}>
            {card.interests.map((hobby, index) => {
                return <div key={index }>
                <li key={hobby} style={styles.interestItem}>
                    {hobby}
                </li>
                </div>
            })}
        </ul>
        <div style={styles.socialLinks}>
            {card.socials.map((btn, index) => {
                return <div key={index}>
                    <a href={btn} target="_blank" rel="noopener noreferrer" style={{...styles.link, marginLeft: '0px'}}>
                      {btn }
                    </a>
                        <br />
                    </div>
            })}
                </div>
        </div>
        })} 
            </div>
}

export default App;

            // Styles
 const styles = {
                card: {
                border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            margin: '20px 0px 10px 0px',
            maxWidth: '300px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f8f9fa'
    },
            name: {
                fontSize: '24px',
            marginBottom: '10px',
            color: '#333',
    },
            description: {
                fontSize: '16px',
            color: '#555',
            marginBottom: '15px',
    },
            socialLinks: {
                display: 'flex',
            marginBottom: '15px',
    },
            link: {
                textDecoration: 'none',
            color: '#fff', // Text color
            padding: '10px 15px', // Padding for the button
            borderRadius: '5px', // Border radius for rounded corners
            backgroundColor: '#007BFF', // Background color for the button
            display: 'inline-block', // Display as inline-block to be side by side
            margin: '10px', // Margin between buttons
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle lift
    },
            interestsHeader: {
                fontSize: '18px',
            marginBottom: '10px',
            color: '#333',
    },
            interestsList: {
                listStyle: 'none',
            padding: 0,
            margin: 0,
    },
            interestItem: {
                fontSize: '14px',
            marginBottom: '5px',
            color: '#555',
    },
  };


