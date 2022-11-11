const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const port = 3001;

