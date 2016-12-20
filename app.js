var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

var User = require("./app/models/user");
var Student = require("./app/models/students");


var app = express();

var router = express.Router();

router.route("/registry")
    .post(function (req, res) {
        var user = new User({
            email: req.body.email, password: req.body.password
        });
        user.save(function (err) {
            if (err == null) {
                res.json({status: "OK"});
            } else {
                res.json({status: "KO"});
            }

        })
    });
router.route("/login")
    .post(function (req, res) {
        User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
            if (user === null) {
                res.json({error: "Usuario o Password invalida", status: 'OK'});
            } else {
                var retToken = jwt.sign(user, "MyApp", {expiresIn: 60 * 60 * 24});
                res.json({status: "OK", user: user, token: retToken});
            }
        })
    });

router.use(function (req, res, next) {
    var token = req.headers.token;
    jwt.verify(token, "MyApp", function (err, decoded) {
        if (err) {
            res.json({status: "KO", msg: "You must be loged"})
        } else {
            next();
        }
    })
});


router.route("/students")
    .get(function (req, res) {
        Student.find(function (err, users) {
            if(err!=null){
                res.json({status: "KO"});
            }else{
                res.json({status: "OK", result: users});
            }

        });
    })
    .post(function (req, res) {
        var student = new Student({
            document: req.body.document,
            name: req.body.name,
            lastname: req.body.lastname,
            date_birthday: req.body.date_birthday
        });

        student.save(function (err) {
            if (err != null) {
                res.json({msg: "Estudiante Creado", status: "OK"});
            } else {
                res.json({msg: err.message, status: "KO"});
            }

        })
    });
router.route("/students/:student_id")
    .get(function (req, res) {
        Student.findById(req.params.student_id, function (err, student) {
            res.json(student);
        });
    })
    .delete(function (req, res) {
        Student.findByIdAndRemove(req.params.student_id, function (err) {
            if (err != null) {
                res.json({msg: "Error eliminado estudiante", status: "KO"});
            } else {
                res.json({msg: "Estudiante eliminado", status: "O"});
            }

        });
    })
    .put(function (req, res) {
        Student.findById(req.params.student_id, function (err, studentMod) {
            studentMod.document = req.body.document;
            studentMod.name = req.body.name;
            studentMod.lastname = req.body.lastname;
            studentMod.date_birthday = req.body.date_birthday;
            studentMod.save(function (err) {
                if (err) {
                    res.json({msg: err.message, status: "KO"});
                } else {
                    res.json({msg: 'Estudiante modificado', status: "OK"});
                }

            })
        });
    })
;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://root:toor@ds159747.mlab.com:59747/fedegara_database");
router.use("/", function (req, res) {
    res.json({mensaje: "Hi!!!!"})
});

app.use("/api", router);
app.use("/bower", express.static(__dirname + "/bower_components"));
app.use("/", express.static(__dirname + "/public"));


app.listen(3000, function () {
    console.info("Server is running mother fucker");
});