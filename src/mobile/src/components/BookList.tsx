import React from 'react';

import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import TextComponent from './TextComponent';

const BookList = (props: any) => {


    const BookDetail = () => {
        props.navigation.navigate("BookDetail");
    }

    return(
        <SafeAreaView style = { BookListStyle.row }>
            <ScrollView contentContainerStyle = { BookListStyle.foo } >
                <TouchableOpacity onPress = { BookDetail } >
                    <Image 
                        source = { { uri: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg" } }
                        style = { BookListStyle.bookThumb }
                    />
                </TouchableOpacity>
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/steve-jobs-walter-isaacson-books-about-computers-678x1024.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/the-soul-of-a-new-machine-tracy-kidder-books-about-computers.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/hackers-steven-levy-books-about-computers.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/the-facebook-effect-david-kirkpatrick-books-about-computer-662x1024.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/how-google-works-eric-schmidt-books-about-computer-692x1024.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/dreaming-in-code-scott-rosenberg-books-about-computer.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/steve-jobs-walter-isaacson-books-about-computers-678x1024.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/the-soul-of-a-new-machine-tracy-kidder-books-about-computers.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/hackers-steven-levy-books-about-computers.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/the-facebook-effect-david-kirkpatrick-books-about-computer-662x1024.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/how-google-works-eric-schmidt-books-about-computer-692x1024.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
                <Image 
                    source = { { uri: "https://web.archive.org/web/20191029162626im_/https://www.aboutgreatbooks.com/wp-content/uploads/2016/04/dreaming-in-code-scott-rosenberg-books-about-computer.jpg" } }
                    style = { BookListStyle.bookThumb }
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookList;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const BookListStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * .6,
        marginTop: 15
    },
    bookThumb: {
        height: width * .4,
        width: width * .3,
        margin: 5
    },
    foo: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection : "row", 
        flexWrap : "wrap",
    }
})