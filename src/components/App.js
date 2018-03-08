import React from 'react';
import Link from 'redux-first-router-link';

import { getIsUsingFallback } from '@/adapters/web3/init';

import Search from './Search';
import Switcher from './Switcher';

const App = () => (
  <div className='turbo-app'>
    <header className='turbo-header'>
      <div>
        <Link to='/' className='turbo-header__link'>
          <h1 className='turbo-header__title'>Block Explorer</h1>
        </Link>
        <p className='turbo-header__fineprint'>Connected to {getIsUsingFallback()
          ? 'TURBO (rpc.turboblockware.org)'
          : 'your Web3 browser extension (e.g. Metamask)'}
        </p>
      </div>
      <Search />
    </header>
    <Switcher />
  </div>
);

export default App;
