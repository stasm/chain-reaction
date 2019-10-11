export function integer(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function float(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

export function element(arr: Array<unknown>) {
    return arr[integer(0, arr.length - 1)];
}
