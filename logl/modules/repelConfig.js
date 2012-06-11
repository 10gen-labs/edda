sudo rm -R /data/rs1
sudo rm -R /data/rs2
sudo rm -R /data/rs3

sudo killall mongod
sudo killall mongo 

sudo mkdir -p /data/rs1
sudo mkdir -p /data/rs2
sudo mkdir -p /data/rs3

sudo chown kaushalparikh /data/rs1
sudo chown kaushalparikh /data/rs2
sudo chown kaushalparikh /data/rs3

sudo ./mongod --replSet foo --logpath '1.log' --dbpath /data/rs1 --port 27017 --fork
sudo ./mongod --replSet foo --logpath '2.log' --dbpath /data/rs2 --port 27018 --fork
sudo ./mongod --replSet foo --logpath '3.log' --dbpath /data/rs3 --port 27019 --fork

sudo ./mongo localhost:27017/foo

config = { _id: "foo", members:[
          { _id:0, host : 'localhost:27017' },
          { _id:1, host : 'localhost:27018' },
          { _id:2, host : 'localhost:27019', arbiterOnly: true } ]
}

rs.initiate(config)

rs.status()



var random = Math.floor(Math.random()*5)
for(i = 0; i<Math.floor(Math.random()*30); i++){
	db.foo.insert({_id: Math.floor(Math.random()*86753)
}
