require('dotenv').config();
const express = require('express');
const https = require('https');


const payStack = {

  acceptPayment: async(req, res) => {
    try {
      // request body from the clientsno  
      console.log(req.body)
      const email = req.body.email;
      const amount = req.body.amount;
      const product = req.body.product;
      const paymentId = req.body.paymentId;
      

      // params
      const params = JSON.stringify({
        "email": email,
        "amount": amount * 100,
        // callback_url: "http://localhost:3000/confirmpayment",
        callback_url: "https://marshalproverbs.netlify.app/confirmpayment",
        metadata: {"cart_id":398,"custom_fields":[{"display_name":"Transaction ID","variable_name":"Transaction ID","value":paymentId},{"display_name":"Product","variable_name":"cart_items","value":product}]},
        channels: ["card"],
        "currency": "USD"
      })

     
      // options
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        // headers: {
        //   Authorization: 'Bearer sk_test_ec42ee57a94ea0bf4693f7b284c2887c8635d941', // where you place your secret key copied from your dashboard
        //   'Content-Type': 'application/json'
        // }
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.PUBLIC_KEY,
        }
      }
      // client request to paystack API
      const clientReq = https.request(options, apiRes => {
        let data = ''
        apiRes.on('data', (chunk) => {
          data += chunk
        });
        apiRes.on('end', () => {
          console.log(data);
          return res.status(200).json(data);
        })
      }).on('error', error => {
        console.error(error)
      })
      clientReq.write(params)
      clientReq.end()
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  verifyPayment: async(req, res) => {
  
    const reference = req.query.reference

    console.log(req.query)

    console.log('reference =',reference)

    try {
        const options = {
          hostname: 'api.paystack.co',
          port: 443,
          path: `/transaction/verify/${reference}`,
          method: 'GET',
          headers: {
            Authorization: process.env.PUBLIC_KEY,
          }
        }
  
        const apiReq = https.request(options, (apiRes) => {
          let data = '';
    
          apiRes.on('data', (chunk) => {
            data += chunk;
          });
    
          apiRes.on('end', () => {
            console.log(JSON.parse(data));
            return res.status(200).json(data);
          });
        });
    
        apiReq.on('error', (error) => {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' });
        });
    
        // End the request
        apiReq.end();
      
      } catch (error) {
         // Handle any errors that occur during the request
         console.error(error);
         res.status(500).json({ error: 'An error occurred' });
      }
  },
  testApi: (req, res) => {
    res.status(200).json({ message: 'API is working' });
  },
  subscription: (req, res) => {
    // res.status(200).json({ message: 'API is working' });

    try {
      const { customerId, plan } = req.body;
      const params = JSON.stringify({
        "customer": customerId,
        "plan": plan
      })
      
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/subscription',
        method: 'POST',
        headers: {
          Authorization: process.env.PUBLIC_KEY,
          'Content-Type': 'application/json'
        }
      }

      
      const request = https.request(options, apiRes => {
        let data = ''
      
        apiRes.on('data', (chunk) => {
          data += chunk
        });
      
        apiRes.on('end', () => {
          console.log(JSON.parse(data))
          res.status(200).json(JSON.parse(data));
        })
      }).on('error', error => {
        console.error(error)
      })
      
      request.write(params)
      request.end()
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  fetchCustomer: (req, res) => {
    try {

      const email = req.body.email
      // res.status(200).json({ message: 'API is working', email: email });

      const params = JSON.stringify({
        "email": email
      })

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/customer/${email}`,
      method: 'GET',
      headers: {
        Authorization: process.env.PUBLIC_KEY
      }
    }

    const request = https.request(options, apiRes => {
      let data = ''

      apiRes.on('data', (chunk) => {
        data += chunk
      });

      apiRes.on('end', () => {
        console.log(JSON.parse(data))
        res.status(200).json(JSON.parse(data));
      })
    }).on('error', error => {
      console.error(error)
    })

    request.write(params)
    request.end()

    } catch(error){
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  fetchSubscription: (req, res) => {
    try {

      const id = req.body.id
      // res.status(200).json({ message: 'API is working', email: email });

      const params = JSON.stringify({
        "id": id
      })

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/subscription/${id}`,
      method: 'GET',
      headers: {
        Authorization: process.env.PUBLIC_KEY
      }
    }

    const request = https.request(options, apiRes => {
      let data = ''

      apiRes.on('data', (chunk) => {
        data += chunk
      });

      apiRes.on('end', () => {
        console.log(JSON.parse(data))
        res.status(200).json(JSON.parse(data));
      })
    }).on('error', error => {
      console.error(error)
    })

    request.write(params)
    request.end()

    } catch(error){
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}

const initializePayment = payStack;
module.exports = initializePayment;