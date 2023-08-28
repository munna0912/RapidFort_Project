#include <stdio.h>
int main()
{
    int n;
    printf("please enter no. of elements in array : ");
    scanf("%d", &n);
    int array[n];
    for (int i = 0; i < n; i++)
    {
        printf("\nPlease enter value of %dth element of array : ", i);
        scanf("%d", &array[i]);
    }
    int search, l = 0;
    printf("\nPlease enter the integer which you want to search in array : ");
    scanf("%d", &search);
    for (int j = 0; j < n; j++)
    {
        if (array[j] == search)
        {
            printf("\n%d exist in array and it's index is array[%d] and address is %u", search, j, &array[j]);
        }
        else
        {
            l++;
        }
        if (l == n)
        {
            printf("\n%d not exist in array ", search);
        }
    }

    return 0;
}