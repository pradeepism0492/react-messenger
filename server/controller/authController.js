const formidable = require("formidable");
const validator = require("validator");
const registerModel = require("../models/authModel");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { userName, email, password, confirmPassword } = fields;

    const { image } = files;
    const error = [];

    if (!userName) {
      error.push("Please provide your user name");
    }
    if (!email) {
      error.push("Please provide your Email");
    }
    if (email && !validator.isEmail(email)) {
      error.push("Please provide your Valid Email");
    }
    if (!password) {
      error.push("Please provide your Password");
    }
    if (!confirmPassword) {
      error.push("Please provide your confirm Password");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push("Your Password and Confirm Password not same");
    }
    if (password && password.length < 6) {
      error.push("Please provide password mush be 6 charecter");
    }
    if (Object.keys(files).length === 0) {
      error.push("Please provide user image");
    }
    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      const getImageName = files.image.originalFilename;
      const randNumber = Math.floor(Math.random() * 99999);
      const newImageName = randNumber + getImageName;
      files.image.originalFilename = newImageName;
      const newPath =
        __dirname +
        `/../../client/public/images/${files.image.originalFilename}`;

      try {
        const checkUser = await registerModel.findOne({
          email: email,
        });

        if (checkUser) {
          res.status(404).json({
            error: {
              errorMessage: ["Your email already exited"],
            },
          });
        } else {
          fs.copyFile(files.image.filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerModel.create({
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                image: files.image.originalFilename,
              });
              console.log("registration Complete successfully", userCreate);

              const token = jwt.sign(
                {
                  id: userCreate._id,
                  email: userCreate.email,
                  userName: userCreate.userName,
                  image: userCreate.image,
                  registerTime: userCreate.createdAt,
                },
                "pradeepgupta0492",
                {
                  expiresIn: "7d",
                }
              );
              const options = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              };
              res.status(201).cookie("authToken", token, options).json({
                successMessage: "Your Register Successful",
                token,
              });
            } else {
              console.log("error", error);
              res.status(500).json({
                error: {
                  errorMessage: ["Internal Server error"],
                },
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Interanl Server Error"],
          },
        });
      }
    }
  }); // end Formidable
};

module.exports.userLogin = async (req, res) => {
  const error = [];
  const { email, password } = req.body;
  console.log("req.body===>", req.body);
  if (!email) {
    error.push("Please provide your Email");
  }
  if (!password) {
    error.push("Please provide your Password");
  }
  if (email && !validator.isEmail(email)) {
    error.push("Please provide your valid email");
  }
  if (error.length > 0) {
    res.status(404).json({
      error: {
        errorMessage: error,
      },
    });
  } else {
    // check email is present in bd or not
    try {
      const checkUser = await registerModel
        .findOne({
          email: email,
        })
        .select("+password");
      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.userName,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            "pradeepgupta0492",
            {
              expiresIn: "7d",
            }
          );
          const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          };
          console.log("options==>", options);
          res.status(200).cookie("authToken", token, options).json({
            successMessage: "Your Login Successful",
            token,
          });
        } else {
          res.status(400).json({
            error: {
              errorMessage: ["Your Password not Vaild"],
            },
          });
        }
      } else {
        res.status(400).json({
          error: {
            errorMessage: ["Your Email not Found"],
          },
        });
      }
    } catch (error) {
      res.status(404).json({
        error: {
          errorMessage: ["Internal Server Error"],
        },
      });
      console.log(error);
    }
  }
  res.send(req.body);
};
