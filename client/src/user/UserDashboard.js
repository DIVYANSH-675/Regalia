import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className='card futuristic-card mb-4'>
        <h4 className='card-header futuristic-header'>User Links</h4>
        <ul className='list-group'>
          <li className='list-group-item futuristic-item'>
            <Link className='nav-link futuristic-link' to='/cart'>
              My Cart
            </Link>
          </li>
          <li className='list-group-item futuristic-item'>
            <Link className='nav-link futuristic-link' to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card futuristic-card mb-4'>
        <h3 className='card-header futuristic-header'>User Information</h3>
        <ul className='list-group'>
          <li className='list-group-item futuristic-item'>{name}</li>
          <li className='list-group-item futuristic-item'>{email}</li>
          <li className='list-group-item futuristic-item'>
            {role === 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className='card futuristic-card mb-4'>
        <h3 className='card-header futuristic-header'>Purchase History</h3>
        <ul className='list-group'>
          <li className='list-group-item futuristic-item'>
            {history.map((h, i) => {
              return (
                <div key={i}>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product Name: {p.name}</h6>
                        <h6>Product Price: ${p.price}</h6>
                        <h6>Purchased Date: {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`${name}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-3'>{userLinks()}</div>
        <div className='col-md-9'>
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
