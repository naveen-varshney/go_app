package main

import (
    "fmt"
    // "html/template"
		"log"
    "net/http"
		// "io"
		"os"
		"time"
		"io"
		// "encoding/json"
)

func determineListenAddress() (string, error) {
  // to set up the port
  port := os.Getenv("PORT")
  if port == "" {
    return "", fmt.Errorf("$PORT not set")
  }
  return ":" + port, nil
}

func getSearchResult(w http.ResponseWriter, r *http.Request){

  // https://www.nseindia.com/corporates/corpInfo/equities/getBoardMeetings.jsp?Symbol=&Industry=&Period=Latest%20Announced&Purpose=&period=Latest%20Announced&symbol=&industry=&purpose=

	// Create HTTP client with timeout
	client := &http.Client{
	    Timeout: 30 * time.Second,
	}
	query := r.URL.Query().Get("query")
	request, err := http.NewRequest("GET", "https://www.nseindia.com/corporates/common/getCompanyList.jsp?query="+query, nil)
  if err != nil {
      log.Fatal(err)
  }

  // Make request
  response, err := client.Do(request)
  if err != nil {
      log.Fatal(err)
  }
	defer response.Body.Close()

  // return request body
	io.Copy(w, response.Body)
}



func getIntialResult(w http.ResponseWriter, r *http.Request){
  // to get the all board meeting in latest Announcement period
  // TODO: parse the data which is not coming in json format return back to frontend

  // https://www.nseindia.com/corporates/corpInfo/equities/getBoardMeetings.jsp?Symbol=&Industry=&Period=Latest%20Announced&Purpose=&period=Latest%20Announced&symbol=&industry=&purpose=

	// Create HTTP client with timeout
	client := &http.Client{
	    Timeout: 30 * time.Second,
	}

	request, err := http.NewRequest("GET", "https://www.nseindia.com/corporates/common/getCompanyList.jsp?query="+query, nil)
  if err != nil {
      log.Fatal(err)
  }

  // Make request
  response, err := client.Do(request)
  if err != nil {
      log.Fatal(err)
  }
	defer response.Body.Close()

  // return request body
	io.Copy(w, response.Body)
}

func main() {
	addr, err := determineListenAddress()
  if err != nil {
    log.Fatal(err)
  }

	fs := http.FileServer(http.Dir("static"))
  http.Handle("/", fs)
	http.HandleFunc("/", getIntialResult)
	http.HandleFunc("/search", getSearchResult)
	if err := http.ListenAndServe(addr, nil); err != nil {
    panic(err)
  }
}
