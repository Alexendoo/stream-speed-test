package main

import "testing"
import "math/rand"

func BenchmarkRand(b *testing.B) {
	r := rand.New(rand.NewSource(1))
	buf := make([]byte, 1024)

	i := 0
	for i < b.N {
		n, _ := r.Read(buf)
		i += n
	}
}
