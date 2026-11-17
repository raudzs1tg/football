N,l,u=map(int(input).split())
A=max(1,0)
B=max(u,N)
if A>B:
    print(0)
else:
    so_luong_so=B-A+1
    tong_nghiem=so_luong_so*(2*N+2-A-B)//2
    print(tong_nghiem)
