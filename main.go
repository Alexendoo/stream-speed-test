package main

//go:generate go-bindata -prefix client/dist/ client/dist/

import (
	"io"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", files)
	mux.HandleFunc("/source", source)
	mux.HandleFunc("/sink", sink)

	srv := &http.Server{
		Addr:         "localhost:8080",
		Handler:      mux,
		IdleTimeout:  30 * time.Second,
		ReadTimeout:  20 * time.Second,
		WriteTimeout: 20 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func files(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	if path == "/" {
		path = "/index.html"
	}

	asset, err := Asset(path[1:])
	if err != nil {
		http.NotFound(w, r)
	} else {
		w.Write(asset)
	}
}

func source(w http.ResponseWriter, r *http.Request) {
	random := rand.New(rand.NewSource(1))

	header := w.Header()
	header.Set("Cache-Control", "no-store")
	header.Set("Content-Length", "53687091200")
	header.Set("Content-Type", "application/octet-stream")
	header.Set("X-Content-Type-Options", "nosniff")

	io.CopyN(w, random, 53687091200) // 50 GiB
}

func sink(w http.ResponseWriter, r *http.Request) {
	io.Copy(ioutil.Discard, r.Body)
}
