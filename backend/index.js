const express = require('express');
const axios = require('axios');
const { json } = require('body-parser');
const cors=require('cors');
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(express.urlencoded({ extended: true }));
app.post("/", (req, res) => {
    const autho=Auth();
    res.json(autho);
});
const registerUser = async () => {
    try {
        const response = await axios.post('http://20.244.56.144/test/register', {
            companyName: "KITSW",
            ownerName: "Manish",
            rollNo: "b21it035",
            ownerEmail: "b21it035@kitsw.ac.in",
            accessCode: "FnaAss"
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error registering user:', error);
    }
};
//registerUser();
  const Auth = async () => {
    try {
        const response = await axios.post('http://20.244.56.144/test/auth', {
            "companyName": "KITSW",
            "clientID": "5ad1a264-e4e0-4806-b778-3f097f8c3e63",
            "clientSecret": "oFKbITuoIHpPtCTg",
            "ownerName": "Manish",
            "ownerEmail": "b21it035@kitsw.ac.in",
            "rollNo": "b21it035"
        });
        console.log(response.data);
        return response.data.access_token;
    } catch (error) {
        console.error('Error registering user:', error);
    }
};

const getProducts = async (req, res) => {
    try {
      const token = await Auth(); 
      const { companyName, categoryName } = req.params; 
  
      const response = await axios.get(
        `http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products`,
        {
          headers: {
            "Authorization": `Bearer ${token}`, 
          },
          params: {
            "top": req.query.top,           
            "minPrice": req.query.minPrice,  
            "maxPrice": req.query.maxPrice   
          }
        }
      );
  
      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
  
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Error fetching products');
    }
  };
  

  app.get('/api/products/:companyName/:categoryName', getProducts);

app.listen(5000, (req, res) => {
    console.log("Listening at port 5000")
})