DAPP_BUILD()
{
    SPACE_DEP="PRINT FILE_STAT"

    if [ ! -d src ]; then
        PRINT "Could not find ./src directory in $PWD" "error"
        return 1
    fi
    if [ -d www ]; then
        rm -rf www
    fi
    mkdir www
    cp -r src/* www
    local id=
    id=$(FILE_STAT "." "%u")
    if [ "${id}" -eq "$(id -u)" ]; then
        id=
    fi

    if [ -n "${id}" ]; then
        chown -R "$id:$id" "./www"
    fi

    PRINT "App built into ./www" "ok"
}
