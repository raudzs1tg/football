s=input().strip()
if s:
    s_list=list(s)
    n=len(s_list)
    i=n-1
    while i>=0 and s_list[i]=="1":
        i-=1
    if i<0:
        print("NO NEXT")
    else:
        s_list[i]="1"
        for j in range(i+1,n):
            s_list[j]="0"
        print("".join(s_list))
