const axios = require('axios').default;
const redis = require("redis");
const client = redis.createClient();

const IpAddress = require("../models/ipaddress");

client.on("error", function(error) {
  console.error(error);
});

/* client.flushdb( function (err, succeeded) {
  console.log(succeeded);
}); */

exports.index = async function(req, res) {
  console.log("req.ipInfo", req.ipInfo);
  const ip_address = "154.120.108.223";
  console.log("ip", ip_address);
  try {
    const ipAddress = await IpAddress.find(
      { ipAddress: ip_address },
      { _id: false, __v: false, ipAddress: false }
    );

    if (ipAddress.length > 0) {
      console.log("call mongo db");
      res.status(200).json(ipAddress);
    } else {
      client.get(ip_address, function(err, reply) {
        console.log("Axios request");
        if (reply == null) {
            axios.get('http://api.ipstack.com/' + ip_address + '?access_key=' + process.env.IP_STACK_API_KEY)
            .then(function (response) {
              console.log(response);
              const newIp = {
                'continent': response.data.continent_name,
                'country': response.data.country_name,
                'state': response.data.region_name,
                'latitude': response.data.latitude,
                'longitude': response.data.longitude
            }
            client.set(ip_address, JSON.stringify(newIp));
            res.status(200).json(newIp);
            })
            .catch(function (error) {
              console.log(error);
            })

        }else{
          res.status(200).json(JSON.parse(reply)); 
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
