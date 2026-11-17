def solve():
    n = int(input().strip())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))
    
    intersection = []
    for i in range(n):
        if A[i] == 1 and B[i] == 1:
            intersection.append(i + 1)
            
    q = len(intersection)
    print(q)
    if q > 0:
        print(*(intersection))

if __name__ == '__main__':
    solve()