import { useEffect, createRef } from 'react';
import { useRouter } from "next/router";

import { LOCAL_URL } from '../constants';
import Head from 'next/head';

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn(form, tableID) {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '403620627981-163t2jvlkh52t02pa1sb03lbo52fobpg.apps.googleusercontent.com',
                  'redirect_uri': LOCAL_URL,
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/userinfo.profile',
                  'include_granted_scopes': 'true',
                  'state': tableID};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

const JoinTable = () => {

    const formRef = createRef();
    const router = useRouter();

    useEffect(()=>{
        if(!router.isReady) return;
        oauthSignIn(formRef.current, router.query.tableid);
    }, [formRef, router]);
    
    return (<>
    <Head>
      <title>Rejoindre une table</title>
    </Head>
    <div>
        <form ref={formRef} />
    </div></>)
}

export default JoinTable;
