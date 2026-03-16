// services/firebase.js (Mock implementation using localStorage)
class MockAuth {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    this.listeners = [];
  }
  
  onAuthStateChanged(callback) {
    callback(this.currentUser);
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }
  
  updateUser(user) {
    this.currentUser = user;
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('currentUser');
    }
    this.listeners.forEach(cb => cb(user));
  }
  
  signOut() {
    this.updateUser(null);
  }
}

export const auth = new MockAuth();
export const database = {};

export const createUserWithEmailAndPassword = async (authObj, email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[email]) throw new Error('Email already in use. Please log in.');
  const uid = 'user_' + Date.now();
  users[email] = { email, password, uid };
  localStorage.setItem('users', JSON.stringify(users));
  
  // Return user without auto signing in
  const createdUser = { uid, email };
  return { user: createdUser };
};

export const signInWithEmailAndPassword = async (authObj, email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[email];
  if (!user || user.password !== password) throw new Error('Invalid email or password.');
  
  const currentUser = { uid: user.uid, email: user.email };
  authObj.updateUser(currentUser);
  return { user: currentUser };
};

export const onAuthStateChanged = (authObj, callback) => {
  return authObj.onAuthStateChanged(callback);
};

export const signOut = async (authObj) => {
    authObj.updateUser(null);
};

// ---- Mock Database Functions ----
export const ref = (db, path) => ({ path });

export const push = (reference) => {
  const id = 'task_' + Date.now() + Math.random().toString(36).substr(2, 9);
  return { path: reference.path + '/' + id, key: id };
};

export const set = async (reference, data) => {
  const pathParts = reference.path.split('/');
  const type = pathParts[0]; 
  const id = pathParts[1] || reference.key;
  
  const allData = JSON.parse(localStorage.getItem(type)) || {};
  if (id) {
    allData[id] = data;
  }
  localStorage.setItem(type, JSON.stringify(allData));
  
  triggerListeners(type);
};

export const update = async (reference, data) => {
  const pathParts = reference.path.split('/');
  const type = pathParts[0]; 
  const id = pathParts[1];
  
  const allData = JSON.parse(localStorage.getItem(type)) || {};
  if (id && allData[id]) {
    allData[id] = { ...allData[id], ...data };
  } else if (!id) {
    // If updating the root (less common in this app but possible)
    Object.assign(allData, data);
  }
  localStorage.setItem(type, JSON.stringify(allData));
  
  triggerListeners(type);
}

export const remove = async (reference) => {
  const pathParts = reference.path.split('/');
  const type = pathParts[0]; 
  const id = pathParts[1];
  
  const allData = JSON.parse(localStorage.getItem(type)) || {};
  if (id && allData[id]) {
    delete allData[id];
  }
  localStorage.setItem(type, JSON.stringify(allData));
  
  triggerListeners(type);
}

const dbListeners = {};
const triggerListeners = (type) => {
  if (dbListeners[type]) {
    const allData = JSON.parse(localStorage.getItem(type)) || {};
    const snapshot = {
      val: () => allData,
      forEach: (cb) => {
        Object.keys(allData).forEach(key => {
          cb({ key: key, val: () => allData[key] });
        });
      }
    };
    dbListeners[type].forEach(cb => cb(snapshot));
  }
}

export const onValue = (reference, callback) => {
  const pathParts = reference.path.split('/');
  const type = pathParts[0]; 
  
  if (!dbListeners[type]) dbListeners[type] = [];
  dbListeners[type].push(callback);
  
  // Initial call
  triggerListeners(type);
  
  return () => {
    dbListeners[type] = dbListeners[type].filter(cb => cb !== callback);
  };
};

export const query = () => {};
export const orderByChild = () => {};
export const equalTo = () => {};
export const sendPasswordResetEmail = async () => { console.log("Mock password reset sent"); };
