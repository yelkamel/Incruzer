
import React, {Component} from 'react';
import { Actions } 		  from "react-native-router-flux";
import { AsyncStorage }   from 'react-native';

export function protectedGet(targetUrl, successCallback, failCallback )
{
	AsyncStorage.getItem("userToken").then((value) =>
	{
		if( value != "" && value != null )
		{
			var _headers = {
			    'Authorization' : 'IncruizerToken ' + value,
			    'Content-Type'  : 'application/json'
		    }

			console.log("Token :" + value);

			fetch(targetUrl, {method: 'GET', headers: _headers})
			  	.then((response) => response.json())
			  	.then((responseData) =>
			  	{
				  	if( typeof successCallback !== "undefined" )
				  	{
						successCallback(responseData);
				  	}
				})
				.catch((error) => {
					if( typeof failCallback !== "undefined" )
				  	{
						failCallback(error);
				  	}
				});
	  }
	  else
	  {
		if( typeof failCallback !== "undefined" )
	  	{
			failCallback("No token");
	  	}
	  }
	}).done();
}

export function protectedPost(targetUrl, data, successCallback,failCallback, ContentType)
{
	AsyncStorage.getItem("userToken").then((value) =>
	{
		if( value != "" && value != null )
		{
			var _headers = {
			    'Authorization' : 'IncruizerToken ' + value,
			    'Content-Type'  : (ContentType == null) ? 'application/json' : ContentType
		    }

			var _body = JSON.stringify(data)

			if (ContentType === "multipart/form-data"){
				_body = data
			}
			console.log("protectedPost Url => " + targetUrl);
			console.log("protectedPost Header => " + JSON.stringify(_headers));
			console.log("protectedPost Body   => " + JSON.stringify(_body));

			fetch(targetUrl, {method: 'POST', headers: _headers, body: _body})
			  	.then((response) => response.json())
			  	.then((responseData) =>
			  	{
				  	if( typeof successCallback !== "undefined" )
				  	{
						successCallback(responseData);
				  	}
				})
				.catch((error) => {
					if( typeof failCallback !== "undefined" )
				  	{
						failCallback(error);
				  	}
				});
	  	}
	  	else
	  	{
			if( typeof failCallback !== "undefined" )
			{
				failCallback("No token available");
	  		}
	  }
	}).done();
}


export function unprotectedPost(targetUrl, data, successCallback,failCallback)
{
	fetch(targetUrl, {method: 'POST', body: JSON.stringify(data)})
	  	.then((response) => response.json())
	  	.then((responseData) =>
	  	{
		  	if( typeof successCallback !== "undefined" )
		  	{
				successCallback(responseData);
		  	}
		})
		.catch((error) => {
			if( typeof failCallback !== "undefined" )
		  	{
				failCallback(error);
		  	}
		});
}
