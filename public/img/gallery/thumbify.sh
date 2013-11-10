for f in ./*.jpg; do convert $f -resize "200x200^" thumbs/`basename ${f%.*}`-thumb.jpg; done
