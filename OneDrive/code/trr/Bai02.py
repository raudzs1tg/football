import itertools
import sys

input_data=sys.stdin.read().split()
if input_data:
    n=int(input_data[0])
    k=int(input_data[1])
    S=int(input_data[2])
    results=[list(c) for c in itertools.combinations(range(1,n+1),k)if sum(c)==S]
    print(len(results))
    for r in results:
        print(*r)